import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export interface Show {
  id: string;
  date: string;
  day: string;
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
  day: string;
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

    const shows: Show[] = records.map(record => {
      const dateTimeString = record.get('Date_for_site') as string;
      console.log('📅 Raw Date_for_site field:', dateTimeString);
      
      return {
        id: record.id,
        date: dateTimeString,
        day: record.get('Day') as string,
        time: record.get('Time') as string, // Get time from separate Time field
        showName: record.get('ShowName') as string,
        venue: record.get('Venue') as string,
        location: record.get('location') as string,
        ticketLink: record.get('ticketLink') as string,
        fullBand: record.get('fullBand') as boolean,
        ticketAvail: record.get('Ticket Avail') as string,
        onSaleDate: record.get('On Sale Date') as string,
      };
    });

    // Group shows by date and venue
    const groupedShows: { [key: string]: GroupedShow } = {};
    
    shows.forEach(show => {
      // Normalize date to just the date part (YYYY-MM-DD) for grouping
      const normalizedDate = new Date(show.date).toISOString().split('T')[0];
      const key = `${normalizedDate}-${show.venue}`;
      console.log('🔑 Grouping key:', key, 'for show:', {
        id: show.id,
        date: show.date,
        day: show.day,
        venue: show.venue,
        location: show.location,
        time: show.time
      });
      if (!groupedShows[key]) {
        console.log('📝 Creating new group for key:', key);
        groupedShows[key] = {
          date: show.date,
          day: show.day,
          venue: show.venue,
          location: show.location,
          shows: []
        };
      } else {
        console.log('➕ Adding to existing group for key:', key);
      }
      groupedShows[key].shows.push(show);
    });

    console.log('📊 Final grouped shows:', Object.values(groupedShows));

    return Object.values(groupedShows);
  } catch (error) {
    console.error('Error fetching shows from Airtable:', error);
    return [];
  }
}
