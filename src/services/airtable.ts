import Airtable from "airtable";

const showsApiKey =
  import.meta.env.VITE_AIRTABLE_API_KEY ||
  import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN;

const audienceApiKey =
  import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN ||
  import.meta.env.VITE_AIRTABLE_API_KEY;

const showsBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
const audienceReviewsBaseId = import.meta.env.VITE_AIRTABLE_AUDIENCE_REVIEWS_BASE_ID;
// Audience reviews live in the audience-reviews Airtable base.
// Table name in Airtable is "Reviews" (same as 6G); filter by Select = 6SC.
const audienceReviewsTableName =
  import.meta.env.VITE_AIRTABLE_AUDIENCE_REVIEWS_TABLE_NAME || "Reviews";

const showsBase = showsApiKey && showsBaseId
  ? new Airtable({ apiKey: showsApiKey }).base(showsBaseId)
  : null;

const audienceBase = audienceApiKey && audienceReviewsBaseId
  ? new Airtable({ apiKey: audienceApiKey }).base(audienceReviewsBaseId)
  : null;

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
  discountCode?: string;
  discountPercentage?: string;
  enabledForSite: boolean;
}

export interface GroupedShow {
  date: string;
  day: string;
  venue: string;
  location: string;
  shows: Show[];
}

export interface AudienceReview {
  id: string;
  name: string;
  quote: string;
  photo: string | null;
  select: string;
}

export async function fetchShows(): Promise<GroupedShow[]> {
  try {
    if (!showsBase) {
      console.error("Missing Airtable Shows credentials");
      return [];
    }

    const records = await showsBase("Shows")
      .select({
        filterByFormula: 'AND({ShowName} = "6 String Christmas", {Enabled_For_Site} = TRUE())',
        sort: [{ field: "Date_for_site", direction: "asc" }],
      })
      .all();

    const allShows: Show[] = records.map((record) => {
      const dateTimeString = record.get("Date_for_site") as string;
      const fullBand = record.get("fullBand");

      return {
        id: record.id,
        date: dateTimeString,
        day: record.get("Day") as string,
        time: record.get("Time") as string,
        showName: record.get("ShowName") as string,
        venue: record.get("Venue") as string,
        location: record.get("location") as string,
        ticketLink: record.get("ticketLink") as string,
        fullBand: fullBand === true || fullBand === "Yes" || fullBand === "yes",
        ticketAvail: (record.get("Ticket Avail") as string) || "available",
        onSaleDate: record.get("On Sale Date") as string,
        discountCode: record.get("Discount Code") as string,
        discountPercentage: record.get("Discount Percentage") as string,
        enabledForSite: record.get("Enabled_For_Site") === true,
      };
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const shows = allShows.filter((show) => {
      if (!show.date) return false;
      const showDate = new Date(show.date);
      if (Number.isNaN(showDate.getTime())) return true;
      showDate.setHours(0, 0, 0, 0);
      return showDate >= today;
    });

    const groupedShows: { [key: string]: GroupedShow } = {};

    shows.forEach((show) => {
      const normalizedDate = new Date(show.date).toISOString().split("T")[0];
      const key = `${normalizedDate}-${show.venue}`;
      if (!groupedShows[key]) {
        groupedShows[key] = {
          date: show.date,
          day: show.day,
          venue: show.venue,
          location: show.location,
          shows: [],
        };
      }
      groupedShows[key].shows.push(show);
    });

    return Object.values(groupedShows);
  } catch (error) {
    console.error("Error fetching shows from Airtable:", error);
    return [];
  }
}

export async function fetchAudienceReviews(): Promise<AudienceReview[]> {
  try {
    if (!audienceBase) {
      console.error("Missing Airtable Audience Reviews credentials");
      return [];
    }

    const records = await audienceBase(audienceReviewsTableName)
      .select({
        filterByFormula: "FIND('6SC', {Select})",
      })
      .all();

    return records.map((record) => {
      const photoField = record.get("Photo") as Array<{ url: string }> | undefined;
      const photo =
        Array.isArray(photoField) && photoField.length > 0 ? photoField[0].url : null;

      return {
        id: record.id,
        name: (record.get("Name") as string) || "",
        quote: (record.get("Quote") as string) || "",
        photo,
        select: (record.get("Select") as string) || "",
      };
    });
  } catch (error) {
    console.error("Error fetching audience reviews from Airtable:", error);
    return [];
  }
}
