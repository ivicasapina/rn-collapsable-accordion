import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { ListItem, Separator } from 'native-base';

const Accordion = ({
  data,
  onDataChange
}) => {
  return (
    <View>
      {
        _.map(data, (country) => (
          <Collapse
            key={country.id}
          >
            <CollapseHeader>
              <Separator bordered>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() => onDataChange(country.id)}
                >
                  <Text style={{ alignSelf: 'center', fontSize: 10 }}>{country.name}</Text>
                </TouchableOpacity>
              </Separator>
            </CollapseHeader>
            <CollapseBody>


              {
                country.tournaments && _.map(country.tournaments, (tournament) => (
                  <ListItem
                    key={tournament.id}
                    style={styles.accordionContent(country.tournaments.length || 1)}
                  >
                    <Text style={{ height: 30 }}>{tournament.name}</Text>
                  </ListItem>))

              }
            </CollapseBody>
          </Collapse>)
        )
      }
    </View>
  );
}

export default Accordion;

const styles = StyleSheet.create({
  accordionHeader: {
    flex: 1,
    height: 30,
    alignItems: 'center',
    paddingVertical: 1
  },
  accordionContent: (size) => ({
    height: size * 20
  })
});