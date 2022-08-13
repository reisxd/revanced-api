import fetchURL from 'node-fetch';


async function refreshContributors(db) {
    const repos = [
        {
            repo: 'revanced-cli',
            owner: 'revanced'
        },
        {
            repo: 'revanced-patcher',
            owner: 'revanced'
        },
        {
            repo: 'revanced-patches',
            owner: 'revanced'
        },
        {
            repo: 'revanced-integrations',
            owner: 'revanced'
        },
        {
            repo: 'revanced-manager',
            owner: 'revanced'
        },
    ];

    for (const repo of repos) {
        let contribsRequest;
        try {
            contribsRequest = await fetchURL(`https://api.github.com/repos/${repo.owner}/${repo.repo}/contributors`);
        } catch (e) {
           return console.log('An error occured while getting the contributors.\n' + e.stack);
        }
        const contribsJSON = await contribsRequest.json();
        
        const contribs = [];
        for (const contributor of contribsJSON) {
            contribs.push({
                name: contributor.login,
                avatar: contributor.avatar_url
            });
        }

       await db.writeContributors(repo.repo, contribs);
    }
}

export default refreshContributors;