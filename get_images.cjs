const https = require('https');

const urls = [
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzFhNDYzOGIwMjQ2ODQyNzc5YWI1OTk2MGU5M2FjM2RlEgsSBxDTq_m-sQwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTE2NTQyODI2MTk0MDIwNjk4OQ&filename=&opi=89354086',
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzc2OWVkNzQ2M2RkMDQ0YzE4Y2UzMmM1MDFjMzMyMjQ2EgsSBxDTq_m-sQwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTE2NTQyODI2MTk0MDIwNjk4OQ&filename=&opi=89354086',
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNlYzA2MzAyMDg5MTRiYWZhZGQwOTkyYTc2ZGZhYjdiEgsSBxDTq_m-sQwYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTE2NTQyODI2MTk0MDIwNjk4OQ&filename=&opi=89354086'
];

urls.forEach((url, i) => {
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            const regex = /<img[^>]+src="([^">]+)"/g;
            let m;
            console.log(`--- Screen ${i + 1} ---`);
            while ((m = regex.exec(data)) !== null) {
                console.log(m[1]);
            }
        });
    });
});
