import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import { observer } from 'mobx-react';
import { observable, action, computed, toJS } from 'mobx';

import { filterArrayBySecondArray } from './src/utils/arrayComparer';

@observer
class App extends Component {
  componentDidMount() {
    this.filteredArray = filterArrayBySecondArray(this.teams, this.followedTeams, 'teamId', 'isPopular');
    this.fillPopulare();
  }

  @action
  fillPopulare = () => {
    this.popularArray = _.filter(this.filteredArray, { 'isPopular': true })
  }

  @observable popularArray = [];

  @observable filteredArray = [];

  @observable followedTeams = [
    {
      userId: 1,
      teamId: 1
    },
    {
      userId: 1,
      teamId: 2
    },
    {
      userId: 1,
      teamId: 3
    }
  ]

  @observable teams = [
    {
      id: 1,
      name: "Dinamo"
    },
    {
      id: 2,
      name: "Hajduk"
    },
    {
      id: 3,
      name: "Rijeka"
    },
    {
      id: 4,
      name: "Sarajevo"
    },
    {
      id: 5,
      name: "Željo"
    },
    {
      id: 6,
      name: "Zrinski"
    },
    {
      id: 7,
      name: "Real Madrid"
    },
    {
      id: 8,
      name: "Barcelona"
    },
    {
      id: 9,
      name: "Chelsea"
    },
    {
      id: 10,
      name: "Man. UTD"
    }
  ]

  @action
  toggleFollowed = (item) => {
    const followed = _.find(this.followedTeams, { 'teamId': item.id });
    if (followed) {
      const index = _.indexOf(this.followedTeams, followed);
      this.followedTeams.splice(index, 1, { ...item, isPopular: false })
    }
    else {
      this.followedTeams.push({ 'teamId': item.id, 'userId': 1 })
    }

    this.filteredArray = filterArrayBySecondArray(this.teams, this.followedTeams, 'teamId', 'isPopular');
    this.fillPopulare();
  }

  render() {
    const populare = toJS(this.popularArray);
    const filtered = toJS(this.filteredArray);
    console.log(filtered)
    return (
      <View className="App">
        <View style={{ padding: 50 }}>
          <Text style={{ backgroundColor: '#e2e2e2' }}>POPULAR</Text>
          {_.map(populare, (popular, i) => (
            <View key={Math.random()} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
              <Text>{popular.name}</Text>
              <Button
                style={{ color: popular.isPopular ? 'red' : 'blue', backgroundColor: 'transparent', border: 'none', fontSize: 25 }}
                title={popular.isPopular ? '-' : '+'}
                onPress={() => this.toggleFollowed(popular)} />
            </View>
          ))}
        </View>
        <View style={{ padding: 50 }}>
          <Text style={{ backgroundColor: '#e2e2e2' }}>LIST</Text>
          {
            _.map(filtered, item => (
              <View key={Math.random()} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
                <Text>{item.name}</Text>
                <Button
                  style={{ color: popular.isPopular ? 'red' : 'blue', backgroundColor: 'transparent', border: 'none', fontSize: 25 }}
                  title={popular.isPopular ? '-' : '+'}
                  onPress={() => this.toggleFollowed(popular)} />
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

export default App;