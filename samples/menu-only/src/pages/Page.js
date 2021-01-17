import React, { Fragment } from 'react'
import Link from '@material-ui/core/Link';

const handleClick = (event, history, text) => {
  event.preventDefault();
  history.push((text)?'/item1':'/item2');
}

const Page = ({history, text}) => {
  console.log('history:');
  console.log(history);
  return (
    <Fragment>
      <h1>{text || "Item 1"}</h1>
      <Link href="#" onClick={(e) => handleClick(e, history, text)}>{(text)?'Go to "Item 1"':'Go to "Item 2'}</Link>
    </Fragment>
  );
}

export default Page
