import React, { useState } from 'react';
import { useQuery, useAction, getAccounts, getEngagements, addTwitterAccount, engagePost } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { data: accounts, isLoading: accountsLoading, error: accountsError } = useQuery(getAccounts);
  const { data: engagements, isLoading: engagementsLoading, error: engagementsError } = useQuery(getEngagements);
  const addTwitterAccountFn = useAction(addTwitterAccount);
  const engagePostFn = useAction(engagePost);

  const [newTwitterAccountUsername, setNewTwitterAccountUsername] = useState('');
  const [newTwitterAccountPassword, setNewTwitterAccountPassword] = useState('');
  const [tweetLink, setTweetLink] = useState('');

  if (accountsLoading || engagementsLoading) return 'Loading...';
  if (accountsError || engagementsError) return 'Error: ' + (accountsError || engagementsError);

  const handleAddTwitterAccount = () => {
    addTwitterAccountFn({ username: newTwitterAccountUsername, password: newTwitterAccountPassword });
    setNewTwitterAccountUsername('');
    setNewTwitterAccountPassword('');
  };

  const handleEngagePost = () => {
    engagePostFn({ tweetLink });
    setTweetLink('');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Twitter Account Username'
          className='px-1 py-2 border rounded text-lg'
          value={newTwitterAccountUsername}
          onChange={(e) => setNewTwitterAccountUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Twitter Account Password'
          className='px-1 py-2 border rounded text-lg'
          value={newTwitterAccountPassword}
          onChange={(e) => setNewTwitterAccountPassword(e.target.value)}
        />
        <button
          onClick={handleAddTwitterAccount}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded ml-2'
        >
          Add Twitter Account
        </button>
      </div>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Twitter Link'
          className='px-1 py-2 border rounded text-lg'
          value={tweetLink}
          onChange={(e) => setTweetLink(e.target.value)}
        />
        <button
          onClick={handleEngagePost}
          className='bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold rounded ml-2'
        >
          Engage
        </button>
      </div>
      <div>
        <h2 className='text-lg font-bold mb-2'>Twitter Accounts:</h2>
        {accounts.map((account) => (
          <div key={account.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>{account.username}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className='text-lg font-bold mb-2'>Engagements:</h2>
        {engagements.map((engagement) => (
          <div key={engagement.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>{engagement.tweetLink}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;