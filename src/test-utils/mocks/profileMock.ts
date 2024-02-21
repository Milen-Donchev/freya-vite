export const myProfileMock = {
  id: 1,
  title: 'Flynn Sexton',
  first_name: 'Flynn',
  last_name: 'Sexton',
  slug: 'flynn-sexton',
  image: {
    thumb: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/thumb.png',
    small: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/small.png',
    default: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/default.png',
    source: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/source.png'
  },
  entity: {
    id: 18,
    email: 'test@test.com',
    first_name: 'Test 1',
    last_name: 'Testov 1',
    image: {
      thumb: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/thumb.png',
      small: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/small.png',
      default: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/default.png',
      source: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/source.png'
    },
    registration_status: 2,
    registration_status_title: {
      en: 'Completed'
    }
  },
  profile_type: {
    id: 1,
    name: {
      en: 'Doctor'
    }
  },
  features: {
    superpower: {
      id: 5,
      feature_id: 2,
      value: {
        en: 'bazooka'
      }
    },
    test: false
  },
  has_active_schedule: true
};

export const profileMock = {
  id: 2,
  title: 'Flynn Sexton',
  first_name: 'Flynn',
  last_name: 'Sexton',
  slug: 'flyn-sexton',
  image: {
    thumb: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/thumb.png',
    small: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/small.png',
    default: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/default.png',
    source: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/source.png'
  },
  entity: {
    id: 18,
    email: 'test@test.com',
    first_name: 'Test 1',
    last_name: 'Testov 1',
    image: {
      thumb: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/thumb.png',
      small: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/small.png',
      default: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/default.png',
      source: 'http://odin.test:8000/storage/users/18/64b15e9415d38/image/source.png'
    },
    registration_status: 2,
    registration_status_title: {
      en: 'Completed'
    }
  },
  profile_type: {
    id: 1,
    name: {
      en: 'Doctor'
    }
  },
  features: {
    superpower: {
      id: 5,
      feature_id: 2,
      value: {
        en: 'bazooka'
      }
    },
    test: false
  },
  has_active_schedule: true
};

export const profileTypeMock = {
  id: 1,
  name: {
    en: 'Super Doc'
  },
  features: [
    {
      id: 2,
      name: 'superpower',
      slug: 'superpower',
      required: true,
      label: {
        en: 'Super Power'
      },
      placeholder: {
        en: 'Super Power'
      },
      type: 'select',
      feature_values: [
        {
          id: 3,
          value: {
            en: 'battle sword'
          }
        },
        {
          id: 4,
          value: {
            en: 'axe'
          }
        },
        {
          id: 5,
          value: {
            en: 'bazooka'
          }
        }
      ]
    }
  ],
  required_attributes: ['features.superpower', 'first_name', 'last_name']
};
