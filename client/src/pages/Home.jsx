import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import { FETCH_POST_QUERY } from "../utils/graphql";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Post</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading post...</h1>
        ) : (
          <Transition.Group>
          {data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
          </Transition.Group>
        )}
      </Grid.Row>
      <Grid.Row></Grid.Row>
    </Grid>
  );
};

export default Home;