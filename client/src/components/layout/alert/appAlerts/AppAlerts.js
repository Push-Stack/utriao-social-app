import React from 'react';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';

const AppAlert = ({ alerts }) => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1,
    config: {
      delay: 2000
    }
  });

  return alerts.map(alert => {
    return (
      <animated.div key={alert.id} style={fade}>
        <div
          className={`  text-center p-2 mb-1 text-${
            alert.type === 'success'
              ? 'white default-color-dark'
              : 'white danger-color'
          } `}
        >
          {alert.message}
        </div>
      </animated.div>
    );
  });
};

const mapStateToProps = state => {
  return {
    alerts: state.alerts
  };
};

export default connect(mapStateToProps, null)(AppAlert);
