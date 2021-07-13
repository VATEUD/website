const mod = function (n, m) {
    let remain = n % m;
    let remain2 =  Math.floor(remain >= 0 ? remain : remain + m);
    if(remain2 === 0) return 1;
    else return remain2;
  };
  