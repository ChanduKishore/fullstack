 import {useState} from 'react';

function Display({anecdote, votes}){
  return(
    <>
      <div>{anecdote}</div>
      <div>has {votes} votes </div></>)

}

function Button({text,onClick}){
  return <button onClick={onClick}>{text}</button>
}

function App() {
    const anecdotes = [
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]
    const [selected, setSelected] =useState(0);
    const [votes, setVotes]=useState(Array(anecdotes.length).fill(0));
    const highestVoting = votes.indexOf(Math.max(...votes));
    function handleNext(){
      const randomNum = Math.floor(Math.random()*anecdotes.length);
      setSelected(randomNum);
    }

    function handleVote(){
      
      const copy =[...votes];
      copy[selected]+=1;
      setVotes(copy);
      console.log(highestVoting,votes);
    }
    
    return (<>
      <h1>Anecdote of the day</h1>
      <Display anecdote={anecdotes[selected]} votes={votes[selected]}/>

      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNext} text='next anecdote' />
      
      <h1>Anecdote with most votes</h1>
      <Display anecdote={anecdotes[highestVoting]} votes={votes[highestVoting]}/>
     </>);
    
}

export default App;
