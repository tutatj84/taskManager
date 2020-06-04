const os = require('os');
const ps = require('ps-node');
const path = require('path');

// setInterval(() => {
//   document.querySelector('progress').value = (os.totalmem - os.freemem()) / os.totalmem * 100;
//   document.querySelector('h3').innerText =
//     `${((os.totalmem - os.freemem()) / Math.pow(1024, 3)).toFixed(1)} GB / ${(os.totalmem / Math.pow(1024, 3)).toFixed(1)} GB`
// }, 1000);



ps.lookup({
  command: ''

}, function (err, resultList) {
  if (err) {
    throw new Error(err);
  }

  resultList.forEach(function (process) {
    if (process) {
      div = document.createElement('div');
      div.id = process.pid;
      div.classList.add('baby-process');
      div.innerText = `PID: ${process.pid}   |   Name: ${path.basename(process.command)}`;
      document.querySelector('.process').appendChild(div);

      div.addEventListener('click', () => {
        div.classList.toggle('.click');

      })
      div.addEventListener('dblclick', () => {
        killManyProcess(process);
      })
    }
  });
});

let killManyProcess = (process) => {
  ps.lookup({
    command: `${path.basename(process.command, '.exe')}`

  }, function (err, resultList) {
    if (err) {
      throw new Error(err);
    }
    resultList.forEach( el => {
      ps.kill(`${el.pid}`, (err) => {
        if (err) {
          throw new Error(err)
        } else {
          console.log(`pc is killed`);
        }
      })
    })
    //
    
  });
  
}






