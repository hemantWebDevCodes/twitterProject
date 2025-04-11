import React from 'react'

function ConverIndiaTime({convertedTime}) {

//* Convert To Indian Standard Time
const convertInTime = (IndTime) => {
    const data = new Date(IndTime);
        return data.toLocaleString('en-In', {
            timeZone : 'Asia/Kolkata',
            hour : '2-digit',
            minute : '2-digit',
            month : 'short',
            day : '2-digit',
    });
    }

  return (
    <>
      {convertInTime(convertedTime)}
    </>
  )
}

export default ConverIndiaTime