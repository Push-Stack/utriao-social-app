import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
const ProfileIntro = ({
  socialLinks,
  about,
  createdAt,
  country,
  province,
  city
}) => {
  const renderIntroData = (name, value) => {
    if (name === 'Lives in')
      value = `${city && city + ', '} ${province && province + ', '} ${value} `;
    if (name === 'Joined') value = moment(value).fromNow();

    return (
      <li className="list-group-item border-0 ">
        <div className="d-flex flex-column   ">
          <div className=" small  font-weight-bold text-muted">{name}</div>
          <div className="small overflow-hidden ">{value}</div>
        </div>
      </li>
    );
  };

  const renderSocialButtons = (iClass, name, value) => {
    return (
      <a
        href={value}
        className=" mt-2 form-control btn  btn-sm  bg-info text-white"
      >
        <i className={iClass}></i>
        {name}
      </a>
    );
  };

  const checkSocialLinksValues = () => {
    if (socialLinks) {
      const data = Object.values(socialLinks);
      const isEmpty = data.every(link => {
        return link === '';
      });

      return isEmpty;
    }

    return true;
  };

  return (
    <React.Fragment>
      <div className="card  p-2 rounded">
        <div className="card-header font-weight-bold  bg-white ">
          Profile Info
        </div>

        <ul className="list-group widget list-group-flush p-1 ">
          {country && renderIntroData('Lives in', country)}
          {about && renderIntroData('About me', about)}
          {createdAt && renderIntroData('Joined', createdAt)}

          <li className="list-group-item mt-4 border-0">
            <div className="d-flex flex-column   ">
              {!checkSocialLinksValues() && (
                <div className=" small  font-weight-bold text-muted">
                  Other Social Networks
                </div>
              )}

              <div className=" overflow-hidden ">
                {socialLinks &&
                  socialLinks.facebook &&
                  renderSocialButtons(
                    'fa fa-facebook fa-2x',
                    'facebook',
                    socialLinks.facebook
                  )}
                {socialLinks &&
                  socialLinks.twitter &&
                  renderSocialButtons(
                    'fa fa-twitter fa-2x ',
                    'Twitter',
                    socialLinks.twitter
                  )}

                {socialLinks &&
                  socialLinks.instagram &&
                  renderSocialButtons(
                    'fa fa-instagram fa-2x  ',
                    'Instagram',
                    socialLinks.instagram
                  )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    socialLinks: state.profile.user.socialLinks,
    createdAt: state.profile.user.createdAt,
    city: state.profile.user.city,
    country: state.profile.user.country,
    province: state.profile.user.state,
    about: state.profile.user.description
  };
};

export default connect(mapStateToProps, null)(ProfileIntro);
