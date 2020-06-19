export class Http {
  static fetchData(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.onreadystatechange = function() {
        if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
          const res = JSON.parse(req.responseText);
          resolve(res);
        } else if (req.readyState === XMLHttpRequest.DONE) {
          reject('Something went wrong');
        }
      }
      req.send();
    })
  }
}