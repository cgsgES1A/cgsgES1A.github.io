let data = "";

process.stdin.on('data', (chunk) => {
    data += chunk.toString();
});

process.stdin.on('end', (chunk) => {
    let i = 0;
    while (data[i] != '\n')
        i++;
    let n = parseInt(data.slice(0, i));
    i++;
    let j = i;
    let v;
    let L = [];
    for (v = 0; v < n; v++) {
        while (data[i] != '\n')
            i++;
        let A = data.slice(j, i).split(' ').map(function(item) {
            return parseInt(item);
        });
        L[v] = A;
        i++;
        j = i;
    }
    
    for (v = 0; v < n; v++) {
        if ((L[v][0] - L[v][2]) % 2 == (L[v][1] - L[v][3]) % 2) {
            if (L[v][0] - L[v][1] == L[v][2] - L[v][3])
                if (L[v][0] == L[v][2] && L[v][1] == L[v][3])
                    console.log("Case", (v + 1) + ": 0");
                else
                    console.log("Case", (v + 1) + ": 1");
            else
                console.log("Case", (v + 1) + ": 2");
        }
        else
            console.log("Case", (v + 1) + ": impossible");
    }
});