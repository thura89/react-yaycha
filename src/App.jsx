import { useState } from "react";
import Item from "./components/Item";
import Form from "./components/Form";
import { useApp } from "./ThemedApp";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";

const App = () => {
  const { showForm ,setGlobalMsg } = useApp();
  const [data, setData] = useState([
    {
      id: 1,
      content: "hello I am developer",
      name: "developer",
    },
    {
      id: 2,
      content: "hello I am designer",
      name: "designer",
    },
    {
      id: 3,
      content: "hello I am devops",
      name: "devops",
    },
  ]);
  const remove = (id) => {
    setData(data.filter((item) => item.id !== id));
    setGlobalMsg('The Item was Deleted');

  };

  const add = (content, name) => {
    const id = data[data.length - 1].id + 1;
    setData([...data, { name, content, id }]);
    setGlobalMsg('The Item was Added');
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {showForm && <Form add={add} />}
        {data.map((item) => {
          return <Item key={item.id} item={item} remove={remove} />;
        })}
      </Container>
    </Box>
  );
};

export default App;
