# Airtable Integration Setup Guide

## Step 1: Get Your Airtable Credentials

1. **API Key**: 
   - Go to https://airtable.com/create/tokens
   - Create a new personal access token
   - Give it access to your "6 String Christmas Shows" base
   - Copy the token

2. **Base ID**:
   - Open your Airtable base
   - Look at the URL: `https://airtable.com/[BASE_ID]/tbl...`
   - Copy the BASE_ID part

## Step 2: Set Up Environment Variables

1. Create a `.env` file in your project root:
```bash
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
```

2. Replace `your_api_key_here` and `your_base_id_here` with your actual values

## Step 3: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Shows section
3. You should see your shows loaded from Airtable!

## Features

- **Dynamic Loading**: Shows are loaded from Airtable in real-time
- **Grouping**: Shows on the same date/venue are grouped together
- **Multiple Times**: Each show time gets its own ticket button
- **Status Colors**: 
  - Green: Available tickets
  - Yellow: Coming Soon
  - Orange: Limited tickets
  - Red: Selling Fast
- **Responsive**: Works on all screen sizes

## Troubleshooting

- If shows don't load, check your API key and Base ID
- Make sure your Airtable base is named "Shows" (case-sensitive)
- Ensure the ShowName field contains "6 String Christmas"
- Check the browser console for any error messages
