import React from 'react';
import { ticketsCompetitionResultStatuses } from '../../../../lib/wca-data.js.erb';
import WarningsVerification from './WarningsVerification';
import { adminImportResultsUrl } from '../../../../lib/requests/routes.js.erb';

export default function CompetitionResultActionerView({ ticketDetails, updateStatus }) {
  const { ticket: { metadata: { status, competition_id: competitionId } } } = ticketDetails;

  switch (status) {
    case ticketsCompetitionResultStatuses.submitted:
      return <p>Please lock the competition results from the Posting dashboard.</p>;

    case ticketsCompetitionResultStatuses.locked_for_posting:
      return (
        <WarningsVerification
          ticketDetails={ticketDetails}
          updateStatus={updateStatus}
        />
      );

    case ticketsCompetitionResultStatuses.warnings_verified:
      return (
        <p>
          Please finish the remaining steps in
          {' '}
          <a href={adminImportResultsUrl(competitionId)}>import results page</a>
          .
        </p>
      );

    default:
      return null;
  }
}
