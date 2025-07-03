import { SyntheticEvent, useEffect, useState } from 'react';
import { TSellMovieFields } from '../../ducks/studios/type';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { sellMovieRequest } from '../../ducks/studios/slice';

const useSellMoviePage = () => {
  const dispatch = useAppDispatch();
  const moviesList = useAppSelector((state) => state.movies.allMovies.data);
  const studios = useAppSelector((state) => state.studios.allStudios.data);

  const { loading, error } = useAppSelector((state) => state.studios.sellMovie);

  const [fields, setFields] = useState<TSellMovieFields>({
    movieId: undefined,
    toId: undefined,
    fromId: undefined,
  });

  const [sold, setSold] = useState(false);

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const closeToast = (_e?: SyntheticEvent | Event, reason?: string) =>
    reason !== 'clickaway' && setToast((t) => ({ ...t, open: false }));

  const onChange = ({
    value,
    field,
  }: {
    value?: string;
    field: keyof TSellMovieFields;
  }) => {
    if (field === 'movieId') {
      setFields({
        ...fields,
        [field]: value,
        fromId: moviesList.find((item) => item.id === value)?.studioId,
      });
    } else setFields({ ...fields, [field]: value });
  };

  const onSubmit = () => {
    if (fields.movieId && fields.fromId && fields.toId)
      dispatch(sellMovieRequest(fields));
  };

  useEffect(() => {
    if (!loading && !error && fields.movieId) {
      setFields({});
      setSold(true);
      setToast({
        open: true,
        message: 'Done!',
        severity: 'success',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);

  useEffect(() => {
    if (error) {
      setToast({
        open: true,
        message: error.message ?? '',
        severity: 'error',
      });
    }
  }, [error]);

  const onNewRequest = () => {
    setSold(false);
  };

  return {
    fields,
    moviesList,
    loading,
    studios,
    sold,
    toast,
    closeToast,
    onChange,
    onNewRequest,
    onSubmit,
  };
};

export default useSellMoviePage;
