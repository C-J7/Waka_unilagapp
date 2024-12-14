 import '../styles/styles.css';

   interface CardComponentProps {
     title: string;
     info: string;
   }

   const CardComponent: React.FC<CardComponentProps> = ({ title, info }) => {
     return (
       <div className="card">
         <h2>{title}</h2>
         <p>{info}</p>
       </div>
     );
   };

   export default CardComponent;