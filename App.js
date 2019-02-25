import _ from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { observer } from 'mobx-react';

import Accordion from './src/CollapsibleAccordion/Accordion';
import { getTournamentsByCountryId } from './src/CollapsibleAccordion/tournaments';
import allCountries from './src/CollapsibleAccordion/countries';
import { observable, action } from 'mobx';

@observer
class App extends Component {
  @observable countries = allCountries;
  @observable loading = false;

  // async componentWillMount() {
  //   await this.getTournaments(1);
  //   await this.getTournaments(2);
  // }

  @action
  getTournaments = async (countryId) => {
    console.log('klik na button', countryId)
    this.loading = true;
    const tournaments = await getTournamentsByCountryId(countryId);

    const country = _.find(this.countries, { 'id': countryId });
    country.tournaments = tournaments;

    const index = _.indexOf(this.countries, country);
    this.countries.splice(index, 1, country);
    this.loading = false;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.loading ? <Text>Loading...</Text> : <Accordion data={this.countries} onDataChange={this.getTournaments} />}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})