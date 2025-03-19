import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { createUserOrUpdate, deleteUser } from '../../lib/actions/user'
import { clerkClient } from '@clerk/nextjs/server'


export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) 
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt?.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { first_name, last_name, image_url, email_addresses } = evt?.data;
    const email_address = email_addresses?.[0]?.email_address;
    try {
      console.log("Processing event:", eventType, "for user:", id);
      if (!email_address) {
        console.log("Error: No email address provided for user", evt?.data);
        return new Response('Error: No email address provided', { status: 400 });
    }

      const user = await createUserOrUpdate(id, first_name, last_name, image_url, email_address);
      if (user && eventType === 'user.created') {
        
        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
            },
          });
        } catch (error) {
          console.log('Error: cannot update user metadata', error);
        }
        console.log('User created event');
      }
    } catch (error) {
      console.log('Error: cannot create or update user', error);
      return new Response('Error: cannot create or update user', { status: 400 });
    }
  }
  



  if (eventType === 'user.deleted'){
    try{
      await deleteUser(id);

    }catch(error){
      console.log('Error: cannot delete user', error);
      return new Response('Error: cannot delete user', {
        status: 400,
      });
    }
    console.log('User deleted event');
  }

  return new Response('Webhook received', { status: 200 })
}