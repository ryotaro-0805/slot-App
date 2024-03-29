import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useInterval, useEffect, useRef, useState } from 'react';
import { db } from '../firebase'

export default function Home() {

  const ref = useRef();
  const [getData, setGetData] = useState([]);

  const [judgeNo, setJudgeNo] = useState(3);
  const [wordNo, setWordNo] = useState(0);
  const [reel1, setReel1] = useState(null);
  const [reel2, setReel2] = useState(null);
  const [reel3, setReel3] = useState(null);


  // 共通
  const start = () => {
    setWordNo(0);
    setJudgeNo(3);
    setReel1(null);
    setReel2(null);
    setReel3(null);
    if (!intervalRef1.current) {
      intervalRef1.current = setInterval(() => {
        setCount1((inner) => inner + 1);
      }, 100);
    }

    if (!intervalRef2.current) {
      intervalRef2.current = setInterval(() => {
        setCount2((inner) => inner + 1);
      }, 100);
    }

    if (!intervalRef3.current) {
      intervalRef3.current = setInterval(() => {
        setCount3((inner) => inner + 1);
      }, 100);
    }
  }

  useEffect(() => {
    judge();
  }, [judgeNo]);

  // 第1リール
  const [count1, setCount1] = useState(0);
  const intervalRef1 = useRef(0);

  useEffect(() => {
    if (count1 > 9) {
      setCount1(0);
    }
  }, [count1]);

  const stop1 = () => {
    clearInterval(intervalRef1.current);
    intervalRef1.current = null;
    console.log('止めた数字は' + count1 + 'です。');
    setReel1(count1);
    setJudgeNo((indata) => indata - 1);
  }

  // 第2リール
  const [count2, setCount2] = useState(0);
  const intervalRef2 = useRef(0);

  useEffect(() => {
    if (count2 > 9) {
      setCount2(0);
    }
  }, [count2]);

  const stop2 = () => {
    clearInterval(intervalRef2.current);
    intervalRef2.current = null;
    console.log('止めた数字は' + count2 + 'です。');
    setJudgeNo((indata) => indata - 1);
    setReel2(count2);
  }

  // 第3リール
  const [count3, setCount3] = useState(0);
  const intervalRef3 = useRef(0);

  useEffect(() => {
    if (count3 > 9) {
      setCount3(0);
    }
  }, [count3]);

  const stop3 = () => {
    clearInterval(intervalRef3.current);
    intervalRef3.current = null;
    console.log('止めた数字は' + count3 + 'です。');
    setJudgeNo((indata) => indata - 1);
    setReel3(count3);
  }

  // 判定
  const judge = () => {
    if (judgeNo === 1) {
      console.log('judge1');
      if ((reel1 === reel2 || reel1 === reel3 || reel2 === reel3)) {
        setWordNo(1);
      }
    }
    if (judgeNo === 0) {
      console.log('judge0');
      if (reel1 === reel2 && reel2 === reel3) {
        setWordNo(2);
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Fighting App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      {getData.map((data, index) => (
        <div key={index}>
          {data}
        </div>
      ))}
      <div>
        <div className={styles.reel_div}>
          <div className={styles.reelContainer}>
            <p className={styles.reel_p}>
              {count1}
              <button className={styles.reel_button} onClick={stop1}>STOP</button>
            </p>
          </div>
          <div className={styles.reelContainer}>
            <p className={styles.reel_p}>
              {count2}
              <button className={styles.reel_button} onClick={stop2}>STOP</button>
            </p>
          </div>
          <div className={styles.reelContainer}>
            <p className={styles.reel_p}>
              {count3}
              <button className={styles.reel_button} onClick={stop3}>STOP</button>
            </p>
          </div>
        </div>
        <br />
        <button className={styles.startButton} onClick={start}>START</button>
      </div>
      <div className={styles.event}>
      {wordNo === 0 && <p className={styles.noevent} >no event</p>}
      {wordNo === 1 && <p className={styles.reach} >reach</p>}
      {wordNo === 2 && <p className={styles.congratulation} >congratulation!!</p>}
      </div>
    </div>
  )
}
