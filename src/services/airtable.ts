import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export interface Show {
  id: string;
  date: string;
  time: string;
  showName: string;
  venue: string;
  location: string;
  ticketLink: string;
  fullBand: boolean;
  ticketAvail: string;
  onSaleDate: string;
}

export interface GroupedShow {
  date: string;
  venue: string;
  location: string;
  shows: Show[];
}

export async function fetchShows(): Promise<GroupedShow[]> {
  try {
    console.log('🔍 Fetching shows from Airtable...');
    console.log('API Key:', import.meta.env.VITE_AIRTABLE_API_KEY ? 'Set' : 'Missing');
    console.log('Base ID:', import.meta.env.VITE_AIRTABLE_BASE_ID ? 'Set' : 'Missing');
    
    const records = await base('Shows').select({
      filterByFormula: `{ShowName} = "6 String Christmas"`,
      sort: [{ field: 'date', direction: 'asc' }]
    }).all();
    
    console.log('📊 Records found:', records.length);

    const shows: Show[] = records.map(record => ({
      id: record.id,
      date: record.get('date') as string,
      time: record.get('date') as string, // Extract time from date field
      showName: record.get('ShowName') as string,
      venue: record.get('Venue') as string,
      location: record.get('location') as string,
      ticketLink: record.get('ticketLink') as string,
      fullBand: record.get('fullBand') as boolean,
      ticketAvail: record.get('Ticket Avail') as string,
      onSaleDate: record.get('On Sale Date') as string,
    }));

    // Group shows by date and venue
    const groupedShows: { [key: string]: GroupedShow } = {};
    
    shows.forEach(show => {
      const key = `${show.date}-${show.venue}`;
      if (!groupedShows[key]) {
        groupedShows[key] = {
          date: show.date,
          venue: show.venue,
          location: show.location,
          shows: []
        };
      }
      groupedShows[key].shows.push(show);
    });

    return Object.values(groupedShows);
  } catch (error) {
    console.error('Error fetching shows from Airtable:', error);
    return [];
  }
}
