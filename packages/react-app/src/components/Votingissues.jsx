import { Card, Grid, Row, Text } from "@nextui-org/react";

export default function Votingissues() {
  const list = [
    {
      title: "Issue #1",
      img: "",
      price: "VOTE",
    },
    {
      title: "Issue #2",
      img: "",
      price: "VOTE",
    },
    {
      title: "Issue #3",
      img: "",
      price: "VOTE",
    },
    {
      title: "Issue #4",
      img: "",
      price: "VOTE",
    },
    {
      title: "Issue #5",
      img: "",
      price: "VOTE",
    },
    {
      title: "Issue #6",
      img: "",
      price: "VOTE",
    },
    {
      title: "Issue #7",
      img: "",
      price: "VOTE",
    },
    {
      title: "Issue #8",
      img: "",
      price: "VOTE",
    },
  ];

  return (
    <Grid.Container gap={2} justify="flex-start">
      {list.map((item, index) => (
        <Grid xs={6} sm={3} key={index}>
          <Card isPressable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={"https://i.etsystatic.com/5235794/r/il/f0ff2a/4066443256/il_1588xN.4066443256_3xa0.jpg" + item.img}
                objectFit="cover"
                width="100%"
                height={140}
                alt={item.title}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>{item.title}</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                  {item.price}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}