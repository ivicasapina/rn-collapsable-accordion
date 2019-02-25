import React, { Component } from 'react';
import { Button } from 'react-native';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

@observer
class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.followButtonStore = new FollowButtonStore();
  }

  render() {
    const { isFollowed, handleIsFollowedToggle } = this.followButtonStore;

    return (
      <Button
        title={isFollowed ? 'Followed' : 'Follow'}
        onPress={handleIsFollowedToggle}
      />
    );
  }
};

export default FollowButton;

class FollowButtonStore {
  @observable isFollowed = false

  @action
  handleIsFollowedToggle = () => {
    this.isFollowed = !this.isFollowed
  }
}

// export default FollowButtonStore