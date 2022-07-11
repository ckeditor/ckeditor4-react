/* eslint-disable react/prop-types */

import * as React from 'react';

function Sidebar( { events, start } ) {
	const content =
		events.length > 0 ? (
			<table>
				<thead>
					<tr>
						<th className="text-left">{'Event'}</th>
						<th className="text-right">{'Editor'}</th>
						<th className="text-right">{'Elapsed [ms]'}</th>
					</tr>
				</thead>
				<tbody>
					{[ ...events ].reverse().map( ( { evtName, editor, date }, i ) => (
						<tr key={i}>
							<td className="text-left">{evtName}</td>
							<td className="text-right">{editor}</td>
							<td className="text-right">{date.getTime() - start.getTime()}</td>
						</tr>
					) )}
				</tbody>
			</table>
		) : (
			<div>{'No events yet!'}</div>
		);

	return <aside className="paper flex-grow-1">{content}</aside>;
}

export default Sidebar;
