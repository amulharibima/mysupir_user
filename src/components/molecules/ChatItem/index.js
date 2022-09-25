import React from 'react';
import IsMe from './IsMe';
import Others from './Others';

const ChatItem = ({isMe, text, time}) => {
  if (isMe) {
    return <IsMe text={text} time={time} />;
  }
  return <Others text={text} time={time} />;
};

export default ChatItem;
