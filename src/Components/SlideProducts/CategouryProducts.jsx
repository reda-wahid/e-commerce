
export default function CategouryProducts({Categoury}) {

  return (
    <>
      <div className="w-11/12 mx-auto">
         {
          Categoury?.map((item)=>(
            <div key={item} className="grid gap-3 container mx-auto">
               <h1 className="text-main_color text-4xl font-bold capitalize">{item.replace("-"," ")}</h1>
               <p className="text-p_color">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis magni molestiae vero accusamus est vitae dolore quaerat, cum, natus, eveniet adipisci deleniti maxime earum quibusdam quia magnam. Recusandae, suscipit nemo?
               </p>
            </div>
          ))
         }
      </div>
    </>
  );
}
