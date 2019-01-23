 const formatTime = date => {//?
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const endFormatTime = (date, x) => { 
  var year = date.getFullYear()  
  var month = date.getMonth() + 1  
  var day = date.getDate()  
  var hour = date.getHours() 
  var minute = date.getMinutes()  + x
  var second = date.getSeconds()   
  if (minute < 0) { 
    minute = 60 + minute
    hour = hour - 1; 
  } 
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':') }



const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  endFormatTime: endFormatTime
}
