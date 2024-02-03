const axios = require('axios');

// Set the necessary headers with the acquired access token
const headers = {
  Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IjhqVGc4NFJUajBta3hOTUJzcmhGa0c1Z3NzbDJleHE4MWVfZ0pJX1BnMHMiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lNGUzNDAzOC1lYTFmLTQ4ODItYjZlOC1jY2Q3NzY0NTljYTAvIiwiaWF0IjoxNjg1MDEwNDg4LCJuYmYiOjE2ODUwMTA0ODgsImV4cCI6MTY4NTAxNDc2MCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhUQUFBQUNOOHdUS0RmSVVNZk1ES1dlU3B0Y3ZoM0FnYnNmdndZUDZ4OGNZU0E4Y0VtZlNycVkyZzVJM2Y0RkVialhPY2VCdnE0b281dEVseXJSc2xjbDRyUzRBdnY0N1BoMk9tTjhza0o0TUtzSHJsOGxXT055Q3FWOVZzWWx0SmdmcnBBcjJMaHVsaTRHN2dSdGlCWU9kSmprWGJKZFdIdVZwWjB6QTFaVlgvQzN0RT0iLCJhbXIiOlsicnNhIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkNULUxNUy1BcHAiLCJhcHBpZCI6Ijk4YzM5NTJhLTU1ZDItNDNmZS05MzBmLTQyMjJlZGVkNzg0ZiIsImFwcGlkYWNyIjoiMSIsImRldmljZWlkIjoiOTYyODU2M2ItNmQyZi00ZWJkLTk1MDYtMDViZjY2YjdjMzFjIiwiZmFtaWx5X25hbWUiOiJLdWtuYSIsImdpdmVuX25hbWUiOiJOaXJtYWwiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDMuMTM3Ljg0LjEzOCIsIm5hbWUiOiJOaXJtYWwgS3VrbmEiLCJvaWQiOiJhZDZjOTVmZC0yZDlkLTQ4MTgtYTA5ZC1hZWVjMzEwY2RhYzkiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDFERkIzM0ZCRiIsInJoIjoiMC5BVWtBT0VEajVCX3Fna2kyNk16WGRrV2NvQU1BQUFBQUFBQUF3QUFBQUFBQUFBQkpBQ2MuIiwic2NwIjoiQXBwbGljYXRpb24uUmVhZFdyaXRlLkFsbCBDYWxlbmRhcnMuUmVhZFdyaXRlIERpcmVjdG9yeS5SZWFkLkFsbCBNYWlsLlJlYWQgTWFpbGJveFNldHRpbmdzLlJlYWQgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwgVXNlci5SZWFkQmFzaWMuQWxsIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImR2Y19tbmdkIiwiZHZjX2NtcCJdLCJzdWIiOiJ2VkttZDlQa003SUNVQW1PaFRvV0VVWkNHdThrSFRWVklvQkpYS2hGZDhnIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiZTRlMzQwMzgtZWExZi00ODgyLWI2ZTgtY2NkNzc2NDU5Y2EwIiwidW5pcXVlX25hbWUiOiJuaXJtYWwua3VrbmFAY2VsZWJhbHRlY2guY29tIiwidXBuIjoibmlybWFsLmt1a25hQGNlbGViYWx0ZWNoLmNvbSIsInV0aSI6InZxam5sLURPSGtLakY0WnpPeTBNQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiLS1uU0RXbzNSS2MzcmVDNXAtN3lKQmktNkVBWEFOOGFRYmRPV1k1QUp4cyJ9LCJ4bXNfdGNkdCI6MTQ4MzE3ODg2MH0.fVvJ8yhwTKihFYu6vs4CjRB4KBZtjCMSCjH3jytzxWtSpRHYHZsrTN5AX9E_ZgOHWeR0VFDeb832K7hqY3utwfa8113htV25ikiPraIsuui7aPOmFTxr7MJe6ge--Mmp3Kiyg7eLImTsEJpXklAtrjOpw4JtWrJEBw5SOx3BmZRutAgIsS1qDeYLi4d_-BKaMi34NRo60ERLmcfUukx0xt_XR9FaQQzcVNFOk9MSwtQO76JY7fQxW3gh92NG0F95VDg_nAI7f9d9jJlv1dGx97dKc5sWmTTQG-J2ssubswWyO0fB6ADsw8CvOToZaaAeJU4eHxHugyqxIQ71dH46zQ',
  'Content-Type': 'application/json',
};

// Create the Team Meeting
const createTeamMeeting = async () => {
  const teamMeeting = {
    subject: 'Nirmal Team Sync',
    start: {
      dateTime: '2023-05-25T16:00:00',
      timeZone: 'India Standard Time',
    },
    end: {
      dateTime: '2023-05-25T17:00:00',
      timeZone: 'India Standard Time',
    },
    location: {
      displayName: 'Microsoft Teams',
    },
    onlineMeetingProvider: 'teamsForBusiness',
    "allowNewTimeProposals": true,
    "isOnlineMeeting": true,
    attendees: [
      {
        emailAddress: {
          address: 'sujit.jha@celebaltech.com',
        },
      },
      {
        emailAddress: {
          address: 'shreyansh.kothari@celebaltech.com',
        },
      }
    ],
  };

  try {
    const response = await axios.post('https://graph.microsoft.com/v1.0/me/calendar/events', teamMeeting, { headers });
    console.log('Team Meeting created:', response.data);
  } catch (error) {
    console.error('Error creating team meeting:', error.response.data);
  }
};
createTeamMeeting();

