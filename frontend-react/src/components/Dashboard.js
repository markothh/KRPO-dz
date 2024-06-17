import React from 'react';
import Header from './Header';

const Dashboard = ({ auth, handleLogout }) => {
  return (
    <div>
      <Header auth={auth} handleLogout={handleLogout} />
          <div className='content'>
            <div style={{ padding: '20px', fontSize: '1.2em', margin: '20px' }}>
              Филипп Киркоров выбрал себе судьбу вечного странника, променяв домашний уют на «кочевую кибитку» артиста…
              Впрочем, скорее сама судьба выбрала его для своих дорог. Когда маленький Филипп тяжело заболел,
              его родители, жившие тогда в Болгарии, отправились к знаменитой пророчице Ванге.
              Она им сказала: «Вижу вашего сына на высокой горе, он стоит и размахивает металлической палкой».
              Только спустя много лет стало понятно, что гора эта — музыкальный Олимп, а «металлическая палка» —
              обычный микрофон…
            </div>
          </div>
    </div>
  );
};

export default Dashboard;