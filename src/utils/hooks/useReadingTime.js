import { useState, useEffect } from 'react';

// Third-grade students = 150 words per minute (wpm)
// Eighth grade students = 250 wpm
// Average college student = 450 wpm
// Average "high-level exec" = 575 wpm
// Average college professor = 675 wpm
// Speed readers = 1,500 wpm
// World speed reading champion = 4,700 wpm
// Average adult = 300 wpm

function useReadingTime(ref, wordsPerMinute = 260) {
  const [readingTime, setReadingTime] = useState(1);
  const [wordsCount, setWordsCount] = useState(1);

  useEffect(() => {
    const elem = ref.current;
    const words = elem.innerText.match(/\w+/g).length;
    const readingTimeCalc = Math.ceil(words / wordsPerMinute);
    setReadingTime(readingTimeCalc);
    setWordsCount(words);
  }, [ref]);

  return { readingTime, wordsCount };
}

export default useReadingTime;
