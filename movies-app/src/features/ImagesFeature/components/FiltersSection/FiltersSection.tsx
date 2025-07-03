import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import useFilterSectionComponent from './useFilterSectionComponent';
import { filterSectionStyles } from './styles';

const FiltersSection = () => {
  const { filters, genresList, cleanFilters, onChange } = useFilterSectionComponent();
  const styles = filterSectionStyles();
  return (
    <div className={styles.container}>
      <Typography
        component="span"
        style={{ fontWeight: 'bold', display: 'inline-block' }}
      >
        Filters:
      </Typography>
      <TextField
        id="filter-title"
        label="Title"
        variant="outlined"
        value={filters.title ?? ''}
        onChange={(e) => onChange('title', e.target.value, )}
        className={styles.field}
      />

      <TextField
        id="filter-min-price"
        label="Min Price"
        variant="outlined"
        value={filters.minPrice ?? ''}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          onChange('minPrice', !isNaN(value) ? value : undefined)
        }}
        type="number"
        className={styles.field}
      />

      <TextField
        id="filter-max-price"
        label="Max Price"
        variant="outlined"
        value={filters.maxPrice ?? ''}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          onChange('maxPrice', !isNaN(value) ? value : undefined)
        }}
        type="number"
        className={styles.field}
      />

      <FormControl variant="outlined" className={styles.field}>
        <InputLabel id="genre-filter-select-label">Genre</InputLabel>
        <Select
          labelId="genre-filter-select-label"
          id="genre-filter-select"
          value={filters.genre ?? ''}
          onChange={(e) => onChange('genre', e.target.value as number)}
          label="Genre"
        >
          <MenuItem value="">...</MenuItem>
          {genresList?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        onClick={cleanFilters}
        style={{ marginLeft: 'auto', marginBottom: 'auto' }}
      >
        Clean filters
      </Button>
    </div>
  );
};

export default FiltersSection;
