import React from 'react'

const isCollinear = (p1, p2, p3) => {
    return (p1.y - p2.y) * (p1.x - p3.x) == (p1.y - p3.y) * (p1.x - p2.x);
}

const moveTo = (target, current, r) => {
    return {
        x: current.x - (current.x - target.x) * r,
        y: current.y - (current.y - target.y) * r
    };
}

export const PathLine = React.createClass({
    render: function(){
        const r = this.props.r;
        const path = this.props
                            .points
                            .slice(1)
                            .reduce((acc, p, i, points) => { 
                                        let next = points[i + 1];
                                        let prev = acc[acc.length - 1];
                                        
                                        if (next && !isCollinear(prev.point, p, next)) {
                                            let before = moveTo(prev.point, p, r);
                                            let after = moveTo(next, p, r);
                                            return acc.concat({
                                                point:p,
                                                s:`L ${before.x} ${before.y} S ${p.x} ${p.y} ${after.x} ${after.y} `
                                            })
                                        } else { 
                                            return acc.concat({
                                                point:p,
                                                s:`L ${p.x} ${p.y} `
                                            })
                                        };
                                    }
                                   , [{
                                       point: this.props.points[0], 
                                       s: `M ${this.props.points[0].x} ${this.props.points[0].y} `
                                   }])
                            .map(p => p.s)
                            .join();
        return (
            <path
                d={path}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                fill={this.props.fill}
                />
        )
    }
})
