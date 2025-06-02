import React from 'react';
import './movie.css';
import { Card, Flex, Typography, Image, Tag, Progress, ConfigProvider } from 'antd';
import MovieRate from '../movie-rate/movie-rate';
import { format } from 'date-fns';
import Context from '../context/context';

const { Title, Text, Paragraph } = Typography;

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;

  const trimmed = text.slice(0, maxLength);
  const lastSpaceIndex = trimmed.lastIndexOf(' ');
  if (lastSpaceIndex === -1) return trimmed + '...';

  return trimmed.slice(0, lastSpaceIndex) + '...';
};

function getColor(vote = 0) {
  if (vote >= 7) return '#66E900';
  if (vote >= 5) return '#E9D100';
  if (vote >= 3) return '#E97E00';
  return '#E90000';
}

// сам компонент
const Movie = ({ movie, onRateMovie, activeRate }) => {
  console.log(movie);
  const shortOverview = truncateText(movie.overview || 'Описание недоступно.', 100);

  const genresList = movie.genre_ids.map((id) => (
    <Context.Consumer key={id}>
      {(context) => (
        <li>
          <Tag color="default">{context.genres.get(id)}</Tag>
        </li>
      )}
    </Context.Consumer>
  ));

  return (
    <ConfigProvider theme={{ token: { colorSuccess: 'rgb(0,0,0)' } }}>
      <Card className="card" hoverable styles={{ body: { padding: 0, overflow: 'hidden' } }}>
        <Flex>
          <Image
            className="card--image"
            style={{ width: 180, height: 280 }}
            src={movie.poster_path && `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
          <Flex className="card--box" vertical align="flex-end" justify="space-between">
            <div className="card-info">
              <div className="card--title">
                <Title level={4}>{movie.title}</Title>
                <Progress
                  type="circle"
                  format={() => movie.vote_average.toFixed(1)}
                  percent={100}
                  size={40}
                  strokeColor={getColor(movie.vote_average)}
                />
              </div>
              <Text type="secondary">{movie.release_date && format(new Date(movie.release_date), 'PP')}</Text>
              <ul>{genresList}</ul>
              <Paragraph className="card--description">{shortOverview}</Paragraph>
            </div>
            <MovieRate
              activeRate={activeRate}
              currentRating={movie.rating}
              onRate={(value) => onRateMovie(movie.id, value)}
            />
          </Flex>
        </Flex>
      </Card>
    </ConfigProvider>
  );
};

export default Movie;
