import React from 'react';
import TempCard from '../../components/TempCard';

const styles = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'row wrap',
  }
}
const fakeData = [1, 2, 3, 4, 5, 6];
/**
 * Displays all the current challenges this person has completed
 */
const HomePage = (props) => {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',

    }}>
      <h1> Current Challenges </h1>
        <div style={styles.cardContainer}>
        {fakeData.map( () => <TempCard />)}
        </div>
      <h1> Past Challenges </h1>
      <div style={styles.cardContainer}>
        {fakeData.map( () => <TempCard />)}
      </div>
    </div>
  )
}


export default HomePage;