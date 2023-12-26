"use client"
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const launchDate = new Date('2023-09-15T00:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft('Launch time reached!');
        setModalIsOpen(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="text-center z-10 ">
      <h1 className="md:text-4xl text-xl font-bold mb-">Countdown to Launch</h1>
      <p className="md:text-2xl text-lg">{timeLeft}</p>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Countdown Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Website Launch!</h2>
        <p>Your website has now launched. Congratulations!</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Countdown;
