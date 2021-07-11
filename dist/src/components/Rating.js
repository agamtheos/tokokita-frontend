const Rating = {
  render: (properties) => {
    if (!properties.value) {
      return '<div></div>';
    }
    return `
    <div class="rating">
      <span>
        <i class="${
          properties.value >= 1 
          ? 'fa fa-star' 
          : properties.value >= 0.5 
          ? 'fa fa-star-half-o' 
          : 'fa fa-star-o'
        }">
        </i>
      </span>
      <span>
        <i class="${
          properties.value >= 2 
          ? 'fa fa-star' 
          : properties.value >= 1.5 
          ? 'fa fa-star-half-o' 
          : 'fa fa-star-o'
        }">
        </i>
      </span>
      <span>
        <i class="${
          properties.value >= 3 
          ? 'fa fa-star' 
          : properties.value >= 2.5 
          ? 'fa fa-star-half-o' 
          : 'fa fa-star-o'
        }">
        </i>
      </span>
      <span>
        <i class="${
          properties.value >= 4 
          ? 'fa fa-star' 
          : properties.value >= 3.5 
          ? 'fa fa-star-half-o' 
          : 'fa fa-star-o'
        }">
        </i>
      </span>
      <span>
        <i class="${
          properties.value >= 5 
          ? 'fa fa-star' 
          : properties.value >= 4.5 
          ? 'fa fa-star-half-o' 
          : 'fa fa-star-o'
        }">
        </i>
      </span>
      <span> ${properties.text || ''} </span>
    </div>
    `
  },
};
export default Rating;