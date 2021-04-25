import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState} from 'react';
import next from "next";
next({});
 
import {Button} from 'react-bootstrap';


export default function Home() {

  const[ text, setText] = useState("");

  interface QuestionData {
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: Date;
  }
 
  const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
    let unansweredQuestions: QuestionData[] = [];
    const response = await fetch(
    'http://localhost:17525/api/questions/unanswered',
    );
    unansweredQuestions = await response.json();
    return unansweredQuestions.map((question) => ({
    ...question,
    created: new Date(question.created),
    }));
 };

  function clickHandler(){
 
 
    fetch(process.env.NEXT_PUBLIC_REACT_APP_API + "Home",
    {
        method: 'GET',
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        
    })
    .then(response =>  response.json())
    .then(data=>{
      console.log(data);
      setText(data);
    })

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous"/>
      </Head>
 
  <div className="App">
    <p>{text}</p>
    <h1>Hello!</h1>
    <Button onClick={clickHandler}>Button</Button>
 </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
