// // app/api/chat/route.ts
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     // Validate request
//     if (!request.body) {
//       return NextResponse.json({ error: 'No request body' }, { status: 400 });
//     }

//     const { message } = await request.json();

//     if (!message) {
//       return NextResponse.json({ error: 'Message is required' }, { status: 400 });
//     }

//     // Check for API key
//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       console.error('GEMINI_API_KEY not found in environment variables');
//       return NextResponse.json(
//         { error: 'API key configuration error' },
//         { status: 500 }
//       );
//     }

//     // Initialize Gemini
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//     // Generate content
//     const result = await model.generateContent(message);
//     const response = await result.response;
//     const text = response.text();

//     return NextResponse.json({ response: text });
//   } catch (error) {
//     console.error('Error in chat route:', error);
//     return NextResponse.json(
//       { error: 'Failed to process request' },
//       { status: 500 }
//     );
//   }
// }

// app/api/chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, attachments } = await request.json();

    if (!message && (!attachments || attachments.length === 0)) {
      return NextResponse.json({ error: 'Message or attachments required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found');
      return NextResponse.json({ error: 'API configuration error' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Prepare message content
    let prompt = message || '';
    if (attachments?.length) {
      prompt += '\n[Attached files: ' + attachments.length + ' image(s)]';
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({ response: response.text() });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}