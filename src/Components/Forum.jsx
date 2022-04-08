import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

export const ForumList = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "forums")).then((querySnapshot) => {
      setForums(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        })
      );
    });
  }, []);

  const renderList = forums.map((item) => (
    <ForumListItem key={item.id}>{item.name}</ForumListItem>
  ));
  return <ListGroup>{renderList}</ListGroup>;
};

export const ForumListItem = ({ children }) => {
  return <ListGroup.Item>{children}</ListGroup.Item>;
};
