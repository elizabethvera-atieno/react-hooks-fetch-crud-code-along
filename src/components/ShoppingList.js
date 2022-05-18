import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const[items, setItems]=useState([])
  const[selectedCategory, setSelectedCategory] = useState("All")

  useEffect(()=>{
    fetch("http://localhost:4000/items")
      .then((r)=>r.json())
      .then((data)=>(setItems(data)))
  },[])

  function handleAddItem(newItem){
    setItems([...items, newItem])
    console.log(items)
  }

  function handleDeleteItem(itemDelete){
    const remainingItems = items.filter((item)=>item.id !== itemDelete.id)
    setItems(remainingItems)
  }

  function handleUpdateItem(updatedItem){
    const updatedItems = items.map((item)=> item.id===updatedItem.id ? updatedItem : item)
    setItems(updatedItems)
  }

  const filteredItems = items.filter((item)=>{
    if(selectedCategory==="All"){
      return true
    }else{
      return item.category===selectedCategory
    }
  })
  

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ul className="Items">
        {filteredItems.map((item)=><Item key={item.id} item={item} onDelete={handleDeleteItem} onUpdateItem={handleUpdateItem}/>)}
      </ul>
    </div> 
  );
}

export default ShoppingList;
