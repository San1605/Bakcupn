import React, { useEffect } from 'react';

const RightToLeft = ({html}) => {
  useEffect(() => {
    // Get the ol element
    const olElement = document.querySelector('#content ol');

    // Set the direction to RTL
    olElement.setAttribute('dir', 'rtl');

    // Get all li elements
    const liElements = olElement.getElementsByTagName('li');

    // Loop through each li element and set the text alignment to right
    for (let i = 0; i < liElements.length; i++) {
      liElements[i].style.textAlign = 'right';
    }
  }, []);

  return (
    <div id="content">
      { JSON.stringify(html)}
    </div>
  );
};

export default RightToLeft;
 