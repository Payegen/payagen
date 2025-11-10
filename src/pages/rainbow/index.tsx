import { useState, useEffect } from 'react';
import styles from './index.module.css';

interface TypingEffectProps {
  data: string[];
  delayBetweenItems?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  data,
  delayBetweenItems = 1000,
}) => {
  const [displayedItems, setDisplayedItems] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= data?.length) return;

    const timer = setTimeout(() => {
      setDisplayedItems(prev => [...prev, data[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, delayBetweenItems);

    return () => clearTimeout(timer);
  }, [currentIndex, data, delayBetweenItems]);

  return (
    <div className={styles.container}>
      {displayedItems.map((item, index) => (
        <div 
          key={index} 
          className={styles.item}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      data: ['123231231sdasdsadawd', 'asfaefsfsdasf']
    }
  }
}

export default TypingEffect;
