import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, getAccounts, getEngagements } from 'wasp/client/operations';

const AccountPage = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [engagements, setEngagements] = useState([]);

  const { data: accountsData } = useQuery(getAccounts);
  const { data: engagementsData } = useQuery(getEngagements);

  useEffect(() => {
    if (accountsData) {
      const selectedAccount = accountsData.find(acc => acc.id === Number(accountId));
      setAccount(selectedAccount);
    }
  }, [accountsData, accountId]);

  useEffect(() => {
    if (engagementsData) {
      const accountEngagements = engagementsData.filter(eng => eng.accountId === Number(accountId));
      setEngagements(accountEngagements);
    }
  }, [engagementsData, accountId]);

  if (!account) return 'Loading...';

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>{account.username}</h2>
      <div className='mb-4'>
        <h3 className='text-lg font-bold'>Engagements:</h3>
        <ul>
          {engagements.map(engagement => (
            <li key={engagement.id} className='mb-2'>
              <a href={engagement.tweetLink} target='_blank' rel='noopener noreferrer'>Link to Tweet</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AccountPage;