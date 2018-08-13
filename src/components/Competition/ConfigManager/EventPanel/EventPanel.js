import React, { PureComponent } from 'react';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';

import Events from '../../../../logic/Events';
import RoundConfig from '../RoundConfig/RoundConfig';
import { getGroupifierData, setGroupifierData } from '../../../../logic/wcifExtensions';
import { parseRoundId } from '../../../../logic/formatters';

export default class EventPanel extends PureComponent {
  handleRoundChange = updatedRound => {
    const { wcifEvent, onChange } = this.props;
    onChange({
      ...wcifEvent,
      rounds: wcifEvent.rounds.map(round => round.id === updatedRound.id ? updatedRound : round)
    });
  };

  handleEventConfigChange = config => {
    const { wcifEvent, onChange } = this.props;
    onChange(setGroupifierData('Event', wcifEvent, config));
  };

  render() {
    const { wcifEvent, wcif, competitorsByRound, onWcifChange } = this.props;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography variant="subheading">
            {Events.nameById(wcifEvent.id)}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column" spacing={16}>
            {wcifEvent.rounds.map((round, index) =>
              <Grid item key={round.id}>
                <RoundConfig
                  round={round}
                  wcif={wcif}
                  otherEventsRoundIds={this.otherEventsRoundIds}
                  competitorsByRound={competitorsByRound}
                  onWcifChange={onWcifChange}
                />
              </Grid>
            )}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
