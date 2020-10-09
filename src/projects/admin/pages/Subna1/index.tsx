import * as React from 'react';
import { renderRoutes } from '@/projects/admin/router/router-config';

export interface IAppProps {
}

export interface IAppState {
}

export default class App extends React.Component<any, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    const { routes } = this.props.route;
    return (
      <div>
        {renderRoutes(routes)}
      </div>
    );
  }
}
