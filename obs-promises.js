const { Observable } = require("rxjs");
const { filter } = require('rxjs/operators');
const doSomething = () => {
  return new Promise(resolve => {
    resolve('valor 1');
    resolve('valor 2');
    resolve('valor 3');
    resolve('valor 4');
    setTimeout(() => {
      resolve('valor 3')
    }, 3000);
  })
}

const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $');
    setTimeout(() => {
      observer.next(null);
    }, 5000);
    setTimeout(() => {
      observer.next('valor 4 $')
    }, 5000);
    setTimeout(() => {
      observer.next(null);
    }, 5000);
    setTimeout(() => {
      observer.next('valor 5 $')
    }, 5000);

  });


}

(async () => {
  const rta = await doSomething();
  console.log('valor 1')
})();


(() => {
  const obs$ = doSomething$();

  obs$
    .pipe(
      filter(value => value !== null)
    )
    .subscribe(rta => {
      console.log(rta);
    })
})();
